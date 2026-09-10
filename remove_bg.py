import sys
import os
from PIL import Image
import numpy as np

input_path = r"C:\Users\vishv\Desktop\Portfolio\public\vishv-photo.jpg"
output_path = r"C:\Users\vishv\Desktop\Portfolio\public\vishv-cutout.png"
output_asset_path = r"C:\Users\vishv\Desktop\Portfolio\src\assets\vishv-cutout.png"

print(f"Opening image: {input_path}")
img = Image.open(input_path)

# Resize to high-res web size (e.g., 1000px max) for instant AI inference & ultra-fast web rendering
max_dim = 1000
scale = min(max_dim / img.width, max_dim / img.height, 1.0)
new_w = int(img.width * scale)
new_h = int(img.height * scale)
print(f"Resizing from {img.size} to ({new_w}, {new_h}) for optimal performance...")
img_resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

try:
    print("Running rembg background removal...")
    from rembg import remove, new_session
    session = new_session("isnet-general-use")
    cutout = remove(img_resized, session=session)
    cutout.save(output_path, "PNG", optimize=True)
    cutout.save(output_asset_path, "PNG", optimize=True)
    print("AI background removal successful!")
except Exception as e:
    print(f"rembg error ({e}), trying default remove...")
    from rembg import remove
    cutout = remove(img_resized)
    cutout.save(output_path, "PNG", optimize=True)
    cutout.save(output_asset_path, "PNG", optimize=True)
    print("Default rembg successful!")

print(f"Cutout generated successfully at {output_path}!")
