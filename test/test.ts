import { imageHash } from "../dist/src";
import { should } from 'chai';
import { readFile } from "fs/promises";

should();


describe("ImageHash", () => {
    it("should produce the same hash for the same file", async () => {
        const fileA = await readFile("test/data/random1.png");
        const fileB = await readFile("test/data/random1.png");
        const a = await imageHash(fileA, { algorithm: "sha1" });
        console.log(a);
        const b = await imageHash(fileB, { algorithm: "sha1" });
        console.log(b);

        a.should.equal(b);
    });
    it("should produce different hash for different files", async () => {
        const fileA = await readFile("test/data/random1.png");
        const fileB = await readFile("test/data/random2.png");
        const a = await imageHash(fileA, { algorithm: "sha1" });
        console.log(a);
        const b = await imageHash(fileB, { algorithm: "sha1" });
        console.log(b);

        a.should.not.equal(b);
    });
    it("should produce different hash for slightly modified file",async ()=>{
        const fileA = await readFile("test/data/blank.png");
        const fileB = await readFile("test/data/blank_with_dot.png");
        const a = await imageHash(fileA, { algorithm: "sha1" });
        console.log(a);
        const b = await imageHash(fileB, { algorithm: "sha1" });
        console.log(b);

        a.should.not.equal(b);
    })
    it("should produce different hash for hue-rotated images",async ()=>{
        const fileR = await readFile("test/data/red.png");
        const fileG = await readFile("test/data/green.png");
        const fileB= await readFile("test/data/blue.png");
        const r = await imageHash(fileR, { algorithm: "sha1" });
        console.log(r);
        const g = await imageHash(fileG, { algorithm: "sha1" });
        console.log(g);
        const b = await imageHash(fileB, { algorithm: "sha1" });
        console.log(b);

        r.should.not.equal(g);
        g.should.not.equal(b);
        b.should.not.equal(r);
    })
});
