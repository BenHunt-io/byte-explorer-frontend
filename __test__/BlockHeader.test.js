import BlockHeader from '../lib/BlockHeader';
import reverse from 'buffer-reverse';
import { decode } from 'punycode';

test('Decode block header with only coinbase transaction', () => {

    let rawHeader = 
        // Header
        '00000020' +
        '06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f' + 
        'f19b86227d3b6c7e3786a506ffb4fc6b1942204bd375c4f7fec9d9b900f7f4d8' +
        'f5fd0463' +
        'ffff7f20' +
        '02000000' +
        // Transactions
        '01020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff03510101ffffffff0200f2052a0100000016001452fff61529f49be656745e9b01531167a94762420000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf90120000000000000000000000000000000000000000000000000000000000000000000000000';

    let header = BlockHeader.create(rawHeader, 'BigEndian')

    let decodedHeader = header.getBlockHeader();
    expect(decodedHeader.version).toBe(32);    
    expect(decodedHeader.previousBlockHash).toBe('06226e46111a0b59caaf126043eb5bbf28c34f3a5e332a1fc7b2b73cf188910f');
    expect(decodedHeader.merkleRoot).toBe('f19b86227d3b6c7e3786a506ffb4fc6b1942204bd375c4f7fec9d9b900f7f4d8');
    expect(new Date(decodedHeader.time*1000)).toStrictEqual(new Date('2022-08-23T16:19:01.000Z'));
    expect(decodedHeader.bits).toBe('207fffff')
    expect(decodedHeader.nonce).toBe(2);
})