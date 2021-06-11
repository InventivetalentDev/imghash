import { PNG } from "pngjs";
import * as hasha from "hasha";

export type Image = Buffer;
export type Hash = string;

interface ImageData {
    width: number;
    height: number;
    data: Buffer;
}

export async function imageHash(data: Image, options?: hasha.Options<hasha.ToStringEncoding>): Promise<Hash> {
    return new Promise((resolve, reject) => {
        new PNG().parse(data, (err, parsed) => {
            if (err) {
                reject(err);
                return;
            }

            createDataHash(parsed, options).then(resolve);
        })
    })
}

async function createDataHash(data: ImageData, options?: hasha.Options<hasha.ToStringEncoding>): Promise<Hash> {
    const buffer = Buffer.alloc(data.data.length + 8);
    buffer.writeInt16LE(data.width);
    buffer.writeInt16LE(data.height, 2);
    buffer.writeInt32LE(data.data.length, 4);
    data.data.copy(buffer, 8, 0, data.data.length);

    return hasha.async(buffer, options)
}
