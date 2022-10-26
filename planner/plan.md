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

## Search Field

I want to be able to search for raw block data by block height or block hash.
I can use a standard MUI TextField component to do this.

1. Take search input from the user, this will live as state in the SearchField component.
2. Upon pressing enter, we should make an async call to fetch the data from GetBlock.io
3. The returned data will not be saved in the search field. Rather, a callback can be passed to the SearchField component as a prop
to decide what to do with the queried data.

There needs to be some logic that determines the type of the input, either block height or block hash. When the input is just numbers between the range of (1-chainHeight), it is a search based on the height. Otherwise it is a search based on hash.

Search Result:
 - Not found: Display informational message, "Block data in Mainnet not found for {queryArgName}: {queryArgValue}"
 - Connection issue: display error message, "Search is currently having issues. Please try again later."
 - Successful Result: No need to do snackbar, result will be pasted into the block input field.



