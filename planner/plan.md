What are the components of decoding?
- The basic encoding format of the information (utf8, hex, decimal, etc)
- The length of the information measured in characters
- Other protocol specific encoding strategies (reversed byte order, variable length fields, etc)

How do I know if the decoding is correct?
- The encoding format the data has been given to us is correct. 
    - Currently the decoder accepts hex data.
- The size of the information is correct.
- The information is within a valid range of values.
- The information has valid links (references real existing data).


Need a way to give feedback to the user on whether the format of a block is correct.

If I can strip away the non protocol specific encoding and decode to binary, then I'm able to present that information in any way that I want to the user.

EncodedInformation --> BinaryRepresentation --> Any format we want to display it in

As we decode the information to binary, we are not checking that the meaning of the information is correct, we are just checking it's shape. Could potentially break this decoding up into two steps. Not sure though because the block itself should contain the information that describes what the shape of the data is.

```
const errors = {};

parseSection(byteReader){

    let buffer = decodeToBinary(byteReader);
    parseBinarySection(buffer);
    
}

decodeToBinary(byteReader){

    errors.section = {};

    let buffer = byteReader.read(8);
    if(buffer.byteLength != 8){
        errors.section.reason = `Number of bytes: ${buffer.byteLength} is less than the expected 8`;
        throw new Exception(errors);
    }

    return buffer;
}

parseBinarySection(buffer, errors){

    let version = buffer.readUint8();

    if(version <= 0 && version >= 50){
        errors.section.reason = `Version ${version} is not within
        the accepted range of values: ${range}`
        throw new Exception(errors);

    }

    return version;
}
```




Could also use a Map<string, string | null> here so that I can enforce the types in typescript.
```
// Map of errors, no entry means the field hasn't been processed.
{
    fieldName: {
        reason: string
    }
    ...
}
```

