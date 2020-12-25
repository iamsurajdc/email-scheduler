# Email Scheduler

Email scheduler is a cron based email schedular which fetches records from db and sends email by comparing dates

## Installation

1. Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install npm libraries.

2. Also you have to set up your environmnet file with token for SendGrid and DB credentials.

3. Import schedule DB in MySQL from ```modules\database\schedule.sql``` 

```
git clone https://github.com/iamsurajdc/email-scheduler.git
```
```
npm install
```
```
npm start
```

## Usage

Postman Collection: ```https://www.getpostman.com/collections/517c48aadb1234b8a446```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure you are not high when creating issues.

## License
[MIT](https://choosealicense.com/licenses/mit/)