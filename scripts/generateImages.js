import fs from "fs";
import path from "path";

const imageFolder = "./public/images";

const files = fs.readdirSync(imageFolder);

const images = files.filter(file => {

    return /\.(png|jpg|jpeg|webp)$/i.test(file);

});

const output = `

export default ${JSON.stringify(images,null,4)}

`;

fs.writeFileSync(

"./src/imageList.js",

output

);

console.log("Đã tạo imageList.js");