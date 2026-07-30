#!/usr/bin/env python3

import json
import sys
import re

from PIL import Image

from transformers import (
    DonutProcessor,
    VisionEncoderDecoderModel
)

MODEL_NAME = "naver-clova-ix/donut-base-finetuned-cord-v2"

processor = DonutProcessor.from_pretrained(MODEL_NAME)
model = VisionEncoderDecoderModel.from_pretrained(MODEL_NAME)

model.eval()


def to_float(value):

    if value is None:
        return 0.0

    if isinstance(value, (int, float)):
        return float(value)

    value = str(value)

    value = re.sub(r"[^0-9.]", "", value)

    try:
        return float(value)
    except:
        return 0.0


def extract_items(prediction):

    items = []

    menu = prediction.get("menu", [])

    for item in menu:

        items.append({

            "name":
                item.get("nm", ""),

            "quantity":
                to_float(item.get("cnt", 1)),

            "price":
                to_float(item.get("price", 0))

        })

    return items


def parse_receipt(prediction):

    merchant = ""

    date = ""

    receipt_number = ""

    subtotal = 0

    tax = 0

    total = 0

    currency = "USD"

    if "company" in prediction:
        merchant = prediction["company"]

    elif "store" in prediction:
        merchant = prediction["store"]

    if "date" in prediction:
        date = prediction["date"]

    if "receipt_no" in prediction:
        receipt_number = prediction["receipt_no"]

    if "subtotal" in prediction:
        subtotal = to_float(prediction["subtotal"])

    if "tax" in prediction:
        tax = to_float(prediction["tax"])

    if "total" in prediction:
        total = to_float(prediction["total"])

    items = extract_items(prediction)

    return {

        "merchant": merchant,

        "transactionDate": date,

        "receiptNumber": receipt_number,

        "subtotal": subtotal,

        "tax": tax,

        "amount": total,

        "currency": currency,

        "items": items

    }

def run(image_path):

    image = Image.open(image_path).convert("RGB")

    task_prompt = "<s_cord-v2>"

    decoder_input_ids = processor.tokenizer(
        task_prompt,
        add_special_tokens=False,
        return_tensors="pt"
    ).input_ids

    pixel_values = processor(
        image,
        return_tensors="pt"
    ).pixel_values

    outputs = model.generate(

        pixel_values,

        decoder_input_ids=decoder_input_ids,

        max_length=model.decoder.config.max_position_embeddings,

        pad_token_id=processor.tokenizer.pad_token_id,

        eos_token_id=processor.tokenizer.eos_token_id,

        use_cache=True,

        bad_words_ids=[[processor.tokenizer.unk_token_id]],

        return_dict_in_generate=True

    )

    sequence = processor.batch_decode(
        outputs.sequences
    )[0]

    sequence = sequence.replace(
        processor.tokenizer.eos_token,
        ""
    )

    sequence = sequence.replace(
        processor.tokenizer.pad_token,
        ""
    )

    # -----------------------------
    # DEBUG OUTPUT
    # -----------------------------

    print("\n========== RAW TOKEN SEQUENCE ==========\n", file=sys.stderr)
    print(sequence, file=sys.stderr)

    prediction = processor.token2json(sequence)

    print("\n========== PYTHON TYPE ==========\n", file=sys.stderr)
    print(type(prediction), file=sys.stderr)

    print("\n========== PARSED JSON ==========\n", file=sys.stderr)
    print(json.dumps(prediction, indent=2), file=sys.stderr)

    # -----------------------------
    # Continue with parser
    # -----------------------------


    print(json.dumps(prediction))

if __name__ == "__main__":

    if len(sys.argv) != 2:

        print(
            "Usage: python donut_receipt_parser.py <image>",
            file=sys.stderr
        )

        sys.exit(1)

    run(sys.argv[1])