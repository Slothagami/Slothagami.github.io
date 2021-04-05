from pyperclip import copy, paste

while True:
    cb = paste()
    if cb.startswith('https://drive.google.com/file/d/'):
        cb = cb.removeprefix('https://drive.google.com/file/d/')
        cb = cb.removesuffix('/view?usp=sharing')

        print(cb)

        copy(cb)
