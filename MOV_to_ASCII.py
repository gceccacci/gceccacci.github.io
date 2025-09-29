import cv2
import numpy as np
import json

# ASCII density characters
density = 'Ñ@#W$9876543210?!abc;:+=-,._          '

# Input and output
video_path = "IMG_1247.mov"  # change to your .MOV filename
output_js = "asciiFrames.js"

# Output size (smaller = faster, lighter)
width = 450

def frame_to_ascii(frame):
    # Convert to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    h, w = gray.shape
    aspect_ratio = h / w
    new_h = int(width * aspect_ratio * 0.5)  # adjust for ASCII aspect
    resized = cv2.resize(gray, (width, new_h))
    ascii_frame = []
    for row in resized:
        line = ''
        for val in row:
            idx = int(np.interp(val, [0, 255], [len(density) - 1, 0]))
            c = density[idx]
            line += c
        ascii_frame.append(line)
    return ascii_frame

# Open video
cap = cv2.VideoCapture(video_path)
frames_ascii = []
frame_skip = 1  # skip every 2nd frame to reduce total

count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    if count % frame_skip == 0:
        ascii_f = frame_to_ascii(frame)
        frames_ascii.append(ascii_f)
    count += 1

cap.release()

# Save as JS file
with open(output_js, "w", encoding="utf-8") as f:
    f.write("const asciiFrames = ")
    json.dump(frames_ascii, f)
    f.write(";")

print(f"Saved {len(frames_ascii)} ASCII frames to {output_js}")
