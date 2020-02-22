
const commander = require('commander');
const { parseArgs } = require('./util/argParser');
const { generateAndWriteListData } = require('./util/fileWriter');
// config commander
commander
  .option('-u, --username <username>', 'Username you want to fetch lists for')
  .option('-l, --lists <lists>', 'Lists you want to fetch')
  .option('-h, --help', 'Call the help');
commander.parse(process.argv);
// example node index -u YourUserName -l ANIME,MANGA
const { username, lists } = commander;
const help = commander.help === undefined;
const parsedArgs = parseArgs({ username, lists, help });
// if no help is specified, then generate the wanted xml-files
if (!parsedArgs.help) {
  generateAndWriteListData(parsedArgs, parsedArgs.username);
}

// TODO: test if fetched list is empty
