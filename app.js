const fs = require('fs');
const yargs = require('yargs');
const geocode = require('./geolocation');
const comments = require('./comments');

const argv = yargs
  .command('add', 'Add new comment', {
      title: {
          alias: 't',
          desc: 'Title of the command',
          default: 'Unknown title'
      },
      content: {
          alias: 'con',
          demand: true,
          desc: 'Content of the comment'
      }
  })
  .command('delete', 'Delete a comment', (yargs) => {
      return yargs.option('id', {
          desc: 'Id of the comment',
          demand: true
      });
  })
  .command('list', 'List all the comments')
  .command('report', 'Print all comments in a text file')
  .command('arrange', 'Arrange all the ids of the comments')
  .command('find', 'Find an address', (yargs) => {
      return yargs.option('a', {
          alias: 'address',
          desc: 'Address of the location',
          demand: true
      });
  })
  .help()
  .argv;
console.log(argv);

const command = process.argv[2];

switch(command) {
    case 'add':
        comments.addComment(argv.title, argv.content);
        break;
    case 'list':
        comments.listComments();
        break;
    case 'delete':
        const deleteStatus = comments.removeComment(parseInt(argv.id));
        if (deleteStatus) {
        console.log('Comment has been deleted');
        } else {
        console.log('Can not find that comment');
        }
        break;
    case 'report':
        comments.reportComments();
        break;
    case 'arrange':
        comments.reArrange();
        break;
    case 'find':
        geocode.getLoc(argv.address);
        break;
}


// fs.writeFileSync('data.txt', input);