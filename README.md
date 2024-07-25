# Readme

Reproduction of issue 8351

How to reproduce:
- Run `npm i`.
- Run `npm run release`.
- Start `./releases/ElectronBuilderRepro8351-1.0.0-x86_64.AppImage`. The app starts correctly.
- Edit `package.json` to update `electron-builder` to `25.0.2`.
- Run `npm i`.
- Run `npm run release`.
- Start `./releases/ElectronBuilderRepro8351-1.0.0-x86_64.AppImage`. The app does not start correctly, with error :
```
Squashfs image uses (null) compression, this version supports only xz, zlib.
ERROR: appimage_shall_not_be_integrated : sqfs_open_image error: DIRECTORY/electron-builder-issue8351/releases/ElectronBuilderRepro8351-1.0.0-x86_64.AppImage
AppImageLauncher error: appimage_shall_not_be_integrated() failed (returned -1)
Squashfs image uses (null) compression, this version supports only xz, zlib.
ERROR: appimage_is_terminal_app : sqfs_open_image error: DIRECTORY/electron-builder-issue8351/releases/ElectronBuilderRepro8351-1.0.0-x86_64.AppImage
AppImageLauncher error: appimage_is_terminal_app() failed (returned -1)
Squashfs image uses (null) compression, this version supports only xz, zlib.

Cannot mount AppImage, please check your FUSE setup.
You might still be able to extract the contents of this AppImage
if you run it with the --appimage-extract option.
See https://github.com/AppImage/AppImageKit/wiki/FUSE
for more information
open dir error: No such file or directory
```
