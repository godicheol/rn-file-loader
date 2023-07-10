import { Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const IS_SUPPORTED = Platform.OS === "android" || Platform.OS === "ios";

const DEFAULT_PICKER_TYPES = [
  DocumentPicker.types.allFiles
];

const DOCUMENT_PICKER_TYPES = {
  all: DocumentPicker.types.allFiles,
  images: DocumentPicker.types.images,
  image: DocumentPicker.types.images,
  plaintext: DocumentPicker.types.plainText,
  text: DocumentPicker.types.plainText,
  audio: DocumentPicker.types.audio,
  pdf: DocumentPicker.types.pdf,
  zip: DocumentPicker.types.zip,
  rar: ["application/vnd.rar", "application/x-rar-compressed"],
  "7z": "application/x-7z-compressed",
  csv: DocumentPicker.types.csv,
  doc: DocumentPicker.types.doc,
  docx: DocumentPicker.types.docx,
  ppt: DocumentPicker.types.ppt,
  pptx: DocumentPicker.types.pptx,
  xls: DocumentPicker.types.xls,
  xlsx: DocumentPicker.types.xlsx,
};

function setPickerTypes(arr) {
  const exts = Object.keys(DOCUMENT_PICKER_TYPES);
  return arr.filter(function(item) {
    return exts.indexOf(item.toLowerCase()) > -1;
  }).reduce(function(prev, curr) {
    const item = DOCUMENT_PICKER_TYPES[curr.toLowerCase()];
    if (Array.isArray(item)) {
      prev = prev.concat(item);
    } else {
      prev.push(item);
    }
    return prev;
  }, []);
};

let fl = {};

fl.pick = async function(options) {
  if (!IS_SUPPORTED) {
    throw new Error("Operating system not supported.");
  }
  if (!options) {
    options = {};
  }
  if (!options.multiple) {
    options.multiple = false;
  }
  if (!options.types) {
    options.types = DEFAULT_PICKER_TYPES;
  } else {
    options.types = setPickerTypes(options.types);
  }

  const picked = await DocumentPicker.pick({
    allowMultiSelection: options.multiple,
    type: options.types,
    copyTo: "cachesDirectory", // or "documentDirectory"
  });

  const result = [];
  for (let i = 0; i < picked.length; i++) {
    const {name, size, type, fileCopyUri} = picked[i];

    result.push({
      name: name,
      size: size,
      type: type,
      path: decodeURI(fileCopyUri.replace(/^.*:\/\//, "")),
    });
  }

  return result;
}

export default fl;