# Lek photographic studio

It is a react-based photo editing software.

I'm sick of downloading photo editing programs that spend excessive graphic resources for simple tasks like adding text or resizing images.

With Lek photographic studio you can edit images with a simple image.js file and text.

## Installation

install the package with:

```bash
npx lek-photographic-studio
```

and you can start working.

## Settings

adjust the image size with settings height and width which are given a number in pixels and will size your image.

## Image
in the Image component you must return a fragment with your html elements.

## <IMG>
you can use the IMG component natively... it is a component that receives as a child the src and that's it.

```javascript
import IMG from "lek-photographic-studio/components/IMG";
import MyImg from "./my_img.jpeg";

<IMG>{ MyImg }</IMG>
```

in addition it has a className and fill so that you can play with these properties.

```javascript
import IMG from "lek-photographic-studio/components/IMG";
import MyImg from "./my_img.jpeg";

<IMG className="my_css_class" fill>{ MyImg }</IMG>
```

when you want to export your image you only have to write in your treminal npm run export and the image will be created by default in an output file in your main folder.

since version 2.0.0 an npm run get-dims <img-path> script has been added.

with this script you can get the dimensions of an image in the console in a convenient way

# License
This software is licensed under the ISC License. The ISC License is a permissive free software license, allowing for freedom to use, modify, and redistribute the software, with some conditions. For the complete terms and conditions, please see the LICENSE file in the root directory of this project.