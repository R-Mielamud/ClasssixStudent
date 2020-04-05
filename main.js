const back = require("androidjs").back;
const fs = require("fs");
const path = require("path");
const md5 = require("md5");

back.on("get_last_10_articles", callbackfn => {
    // TODO:
    //   valid request

    callbackfn([
        {
            "author": {
                "real_full_name": "User1"
            },
            "header": "Header 1",
            "text": "Text1",
            "video": "https://www.youtube.com/embed/3dcli9i_pvA",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRJh49cku_iLAzfVnyXiiIXCJk2Wi4XCStuJnRgEfktOCc7H8x&usqp=CAU"
        },
        {
            "author": {
                "real_full_name": "User2"
            },
            "header": "Header 2",
            "text": "Text2",
            "video": null,
            "image": null
        }
    ]);
});

back.on("is_user_exists", (login, password, callbackfn) => {
    // TODO:
    //   valid request

    const exists = (login === "User1" && password === "Pass1") || (login === "User2" && password === "Pass2");
    callbackfn(exists);
});

back.on("write_file", (pathname, filename, content, callbackfn) => {
    fs.writeFile(path.join(pathname, filename), content, callbackfn);
});

back.on("read_file", (pathname, filename, callbackfn) => {
    fs.readFile(path.join(pathname, filename), (err, data) => {
        if (err) callbackfn("");
        else callbackfn(data + "");
    });
});

back.on("is_user_exists_md5", (login, password, callbackfn) => {
    // TODO:
    //   valid request

    const exists = (login === "User1" && password === md5(md5("Pass1"))) || 
                    (login === "User2" && password === md5(md5("Pass2")));
    
    callbackfn(exists);
});

back.on("md5", (str, callbackfn) => {
    callbackfn(md5(str));
});

back.on("get_subjects", callbackfn => {
    // TODO:
    //   valid request

    callbackfn([
        {
            "index": 1,
            "name": "Subject1"
        },
        {
            "index": 2,
            "name": "Subject2"
        },
        {
            "index": 3,
            "name": "Subject3"
        }
    ]);
});

back.on("get_user_ratings", (username, callbackfn) => {
    // TODO:
    //   valid request

    if (username === "User1") {
        callbackfn([
            {
                "subject": {
                    "name": "Subject1",
                    "index": 1
                },
                "month": 1,
                "day": 2,
                "rating1": {
                    "value": 10,
                    "color": "red"
                },
                "rating2": {
                    "value": 11,
                    "color": "orange"
                }
            },
            {
                "subject": {
                    "name": "Subject2",
                    "index": 2
                },
                "month": 1,
                "day": 1,
                "rating1": {
                    "value": 9,
                    "color": "orange"
                },
                "rating2": {
                    "value": 12,
                    "color": "red"
                }
            }
        ]);
    } else if (username === "User2") {
        callbackfn([
            {
                "subject": {
                    "name": "Subject2",
                    "index": 2
                },
                "month": 1,
                "day": 10,
                "rating1": {
                    "value": 1,
                    "color": "orange"
                },
                "rating2": {
                    "value": 2,
                    "color": "red"
                }
            },
            {
                "subject": {
                    "index": 3,
                    "name": "Subject3"
                },
                "month": 2,
                "day": 1,
                "rating1": {
                    "value": 5,
                    "color": "orange"
                },
                "rating2": {
                    "value": 4,
                    "color": "red"
                }
            }
        ]);
    }
});

back.on("get_months", callbackfn => {
    // TODO:
    //   valid request

    callbackfn([
        {
            "days": 30,
            "name": "Month1",
            "number_in_year": 1,
            "number_in_semester": 1
        },
        {
            "days": 31,
            "name": "Month2",
            "number_in_year": 2,
            "number_in_semester": 2
        },
        {
            "days": 30,
            "name": "Month3",
            "number_in_year": 3,
            "number_in_semester": 3
        },
        {
            "days": 31,
            "name": "Month4",
            "number_in_year": 4,
            "number_in_semester": 4
        },
        {
            "days": 31,
            "name": "Month5",
            "number_in_year": 5,
            "number_in_semester": 1
        },
        {
            "days": 29,
            "name": "Month6",
            "number_in_year": 6,
            "number_in_semester": 2
        },
        {
            "days": 31,
            "name": "Month7",
            "number_in_year": 7,
            "number_in_semester": 3
        },
        {
            "days": 30,
            "name": "Month8",
            "number_in_year": 8,
            "number_in_semester": 4
        },
        {
            "days": 31,
            "name": "Month9",
            "number_in_year": 9,
            "number_in_semester": 5
        }
    ]);
});