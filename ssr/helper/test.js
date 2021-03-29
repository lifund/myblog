

import getFileName_recursive from "./dist/getFileName_recursive.js";
const fileNameArray = await getFileName_recursive('/Users/jangwonseo/myblog/ssr/public/components','.js');
console.log(
    '[getFileName_recursive]',
    fileNameArray
);



import getDirName_recursive from "./dist/getDirName_recursive.js";
const dirNameArray = await getDirName_recursive('/Users/jangwonseo/myblog/ssr/public/components','.js');
console.log(
    '[getDirName_recursive]',
    dirNameArray
);



import addSuffixToFileName from "./dist/addSuffixToFileName.js";
const fileName = '/Users/jangwonseo/myblog/ssr/public/components/App.js'
const fileNameSuffixed = addSuffixToFileName(fileName,'_suffix');
console.log(`
[addSuffixToFileName]
(from)
${fileName},
(to)
${fileNameSuffixed}
`);