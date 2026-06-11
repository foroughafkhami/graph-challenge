This is a fake backend written in nodejs with fairly simple auth and everything with timeseries and pie chart output.

To prepare the project. Run "npm install" and to run the server run "node index.js"

This backend has 5 function calls, they all return a json with a field called "result" it may contain more than one field.

/login (POST)
You should send the default username and password (admin/123456) to the backend via a post request that is "x-www-form-urlencoded". If the login is successful, it will return a json containing a "token" item. "token" should be treated similar to a RESTFUL token.
Example:
{
    "token": "dD8cVbWjKnACxpN3pvp4k2wCToEwNVXn",
    "result": "success"
}

* For all other requests, you should have an authorization header that is in the form "Authorization" : "Bearer dD8cVbWjKnACxpN3pvp4k2wCToEwNVXn" assuming dD8cVbWjKnACxpN3pvp4k2wCToEwNVXn is returned by /login as "token".

/logout (POST)
Should have the authorization header. Assuming the above example, it should have the "Authorization" : "Bearer dD8cVbWjKnACxpN3pvp4k2wCToEwNVXn" header.

/username
If authorization header is right, you will get:
{
    "username": "admin",
    "result": "success"
}
otherwise:
{
    "result": "unauthorized"
}

/list
Return an array of flight data if the authorization header is correct.
Example:
{
    total: 10,
    result: [
        {
            logoSrc: "https://beebom.com/wp-content/uploads/2018/12/Singapore-Airlines-logo.jpg",
            logoStyle: {
                height: "46px",
                margin: "22px 15px"
            },
            src: {
                country: 'Rwanda',
                iso3: 'RWA',
                time: '2021-05-28T09:35:11.523Z',
                airline: 'Kempegowda International'
            },
            dst: {
                country: 'Burkina Faso',
                iso3: 'BFA',
                time: '2021-05-28T11:22:27.523Z',
                airline: 'Indira Gandhi International'
            },
            boarding: '34848', // [secound]
            transfer: false,
            gates: 7,
            seat: '16A',
            price: '2000',
            class: 'economy'
        },
        ...
    ]
}

All Code is Copyright of DSHasin (داده سنجی حصین)