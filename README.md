## Usage

```console
npm install react-native-document-picker 
```

```js
import fl from 'rn-file-loader';
```

```js
const res = await fl.load({
    // all, images, image, plaintext, text, audio, pdf, zip, csv, doc, docx, ppt, pptx, xls, xlsx
    types: ["zip", "image"] // default ["all"]
    multiple: false, // default false
});
// return [{name, size, type, path}]
```

## Acknowledgements
- [react-native-document-picker](https://www.npmjs.com/package/react-native-document-picker)