import express from "express";
import bcrypt from "bcrypt";
import stripe from "stripe";
import con from './database/db.js';

import multer from "multer";


// inisiate server 
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json()); // enable form sharing

// app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));


import "dotenv/config"



//routes
//home route
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: "public" });
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        let name = file.originalname;
        cb(null, `${Date.now()}-${name.substring(name.length - 10, name.length)}`)
    }
})

const upload = multer({ storage });

// upload image 
app.post('/image', upload.single("image"), (req, res) => {

    console.log(req.body);
    console.log(req.file);
    res.json({ "image": req.file.filename });
})




//signup
app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: "public" });
})

app.post('/signup', (req, res) => {
    const { name, email, password, number, tac } = req.body;

    // form validate
    if (name.length < 3) {
        res.json({ "alert": "name must be 3 letters long " })
    } else if (!email) {
        res.json({ "alert": " enter valid email " })
    } else if (password.length < 8) {
        res.json({ "alert": "password must have 8 letters " })
    } else if (!Number(number) || number.length < 10) {
        res.json({ "alert": " enter valid mobile no. " })
    } else if (!tac) {
        res.json({ "alert": " plese agree to our term and condition " })
    } else {

        // store the data in db

        let sql = `SELECT * FROM users WHERE email = '${email}'`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ "error": err });
            } else {

                if (result.length) {
                    return res.json({ 'alert': 'email already exists' })
                } else {
                    // encript the password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            req.body.password = hash;
                            req.body.seller = false;

                            // insert in database
                            let sql = `INSERT INTO users ( name, email, number, password, seller, date) VALUES ( '${name}', '${email}', '${number}', '${req.body.password}', '${false}', current_timestamp())`;

                            con.query(sql, function (err, result) {
                                if (err) {

                                    console.log(err);

                                    res.status(500).json({ "error": err });

                                } else {

                                    console.log(result);

                                    res.json({
                                        name: req.body.name,
                                        email: req.body.email,
                                        seller: req.body.seller
                                    })
                                }
                            })
                        })
                    })
                }

            }
        })
    }

});

// login route
app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: "public" })
})

app.post('/login', (req, res) => {
    let { email, password } = req.body;

    if (!email.length || !password.length) {
        return res.json({ 'alert': 'fill all inputs' });
    }
    // login get data

    let sql = `SELECT * FROM users WHERE email = '${email}'`;

    con.query(sql, function (err, row) {
        if (err) {
            res.status(500).json({ "error": "sommething is wrong" });
        } else {

            if (!row.length) {
                return res.json({ 'alert': 'email does not exists' });
            } else {

                bcrypt.compare(password, row[0].password, (err, result) => {
                    console.log(result);
                    if (result) {
                        return res.json({
                            name: row[0].name,
                            email: row[0].email,
                            seller: row[0].seller
                        })
                    } else {
                        return res.json({ 'alert': 'password is incorrect' });
                        console.log(err);
                    }
                })
            }
        }
    })

})

// seller route
app.get('/seller', (req, res) => {
    res.sendFile("seller.html", { root: "public" })
})

app.post('/seller', (req, res) => {
    let { name, address, about, number, email } = req.body;
    console.log(req.body);
    if (!name.length || !address.length || !about.length || !Number(number)) {
        return res.json({ 'alert': 'some information(s) is/are incorrect' });
    } else {

        // check if account is seller account
        let sql = `SELECT * FROM sellers WHERE email = '${email}'`;
        con.query(sql, function (err, result) {
            if (err) {
                res.status(500).json({ "error": "sommething is wrong" });
            } else {
                if (result.length) {
                    return res.json({ 'alert': 'user already a seller' })
                } else {

                    // insert company detail in database
                    let sql = `INSERT INTO sellers ( name, address, about, number, email, date) VALUES ( '${name}', '${address}', '${about}', '${number}', '${email}', current_timestamp())`;

                    con.query(sql, function (err, result) {
                        if (err) {
                            res.status(500).json({ "error": "sommething is wrong" });
                        } else {

                            // update seller status
                            let sql = `UPDATE users SET seller = 'YES' WHERE email = '${email}'`;

                            con.query(sql, function (err, result) {
                                if (err) {
                                    res.status(500).json({ "error": "sommething is wrong" });
                                } else {
                                    res.json({ 'seller': true })
                                }
                            })

                        }
                    })

                }

            }
        })

    }
})

// dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile("dashboard.html", { root: "public" })
})

// add product
app.get('/add-product', (req, res) => {
    res.sendFile("add-product.html", { root: "public" })
})


app.get('/add-product/:id', (req, res) => {
    res.sendFile("add-product.html", { root: "public" })
})

app.post('/add-product', (req, res) => {
    let { name, shortDes, detail, price, image, tags, email, draft, id } = req.body

    console.log(req.body);
    let sql;

    // add-product
    if (id) {
        sql = `UPDATE users SET name = '${name}', short_des = '${shortDes}', price = '${price}', detail = '${detail}', tags = '${tags}', image = '${image}', user_email = '${email}', draft = '${draft}'  WHERE id = '${id}'`;
    } else {
        sql = `INSERT INTO products ( name, short_des, price, detail, tags, image, user_email, draft) VALUES ('${name}', '${shortDes}', '${price}', '${detail}', '${tags}', '${image}', '${email}', '${draft}')`;
    }

    con.query(sql, function (err, result) {
        if (err) {
            res.status(500).json({ "error": "sommething is wrong" });
        } else {
            res.json({'product':'product is added'});
        }
    })


})

app.post('/get-products', (req, res) => {
    let { email, id, tag } = req.body

    console.log(req.body);

    if (id) {
        var sql = `SELECT * FROM products WHERE id = '${id}'`;

    } else if (tag) {
        var sql = `SELECT * FROM products WHERE tage like %'${tag}'%`;

    } else if (email) {
        var sql = `SELECT * FROM products WHERE user_email = '${email}'`;
    } else {
        var sql = `SELECT * FROM products`;
    }

    con.query(sql, function (err, result) {
        // console.log(sql);
        // console.log(result);   
        if (err) {
            res.status(500).json({ "error": "sommething is wrong" });
        } else {

            if (id) {
                console.log(result);
                return res.json(result[0]);

            } else if (!result.length) {
                return res.json('no products');

            } else {
                let productArr = result;
                console.log(productArr);
                res.json(productArr);
            }
        }
    })

})

// delete route
app.post('/delete-product', (req, res) => {
    let { id } = req.body;
    console.log(id);

    let sql = `DELETE FROM products WHERE id = ${id}`;
    console.log(sql);

    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ "error": "sommething is wrong" });
        } else {
            res.json({'success':'product is deleted'});
        }
    })

})

app.get('/product/:id', (req, res) => {
    //  console.log(req);
    res.sendFile("product.html", { root: "public" });
})

app.get('/search/:key', (req, res) => {
    res.sendFile("search.html", { root: "public" })
})

// review route

app.post('/add-review', (req, res) => {
    let { headline, review, rate, email, product } = req.body;
    console.log(req.body);

    // form validation
    if (!headline.length || !review.length || rate == 0 || email == null || !product) {
        return res.json({ 'alert': 'fill all the inputs' });
    }

    // store review in database
    let sql = `INSERT INTO reviews ( product_id , user_email, headline, review, rating , date) VALUES ( '${product}', '${email}', '${headline}', '${review}', '${rate}' ,current_timestamp())`;

    con.query(sql, function (err, result) {
        if (err) {
            res.json({ 'alert': 'some error occured' })
        } else {
            return res.json({"review": "review is added"});
        }
    })


})

app.post('/get-reviews', (req, res) => {
    let { product, email } = req.body;

    let sql = `SELECT * FROM reviews WHERE product_id = '${product}' LIMIT 4`;

    con.query(sql, function (err, result) {
        if (err) {
            res.json({ 'alert': 'some error occured' })
        } else {
            let reviewArr = result
            return res.json(reviewArr);
        }
    })

})

// cart route
app.get('/cart', (req, res) => {
    res.sendFile("cart.html", { root: "public" })
})

// checkout route
app.get('/checkout', (req, res) => {
    res.sendFile("checkout.html", { root: "public" })
})

// stripe payment
let stripeGateway = stripe(process.env.stripe_key)

let DOMAIN = process.env.DOMAIN

app.post('/strip-checkout', async (req, res) => {
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${JSON.stringify(req.body)}`,
        cancel_url: `${DOMAIN}/checkout?payment_fail=true`,
        line_items: req.body.items.map(item => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        description: item.shortDes,
                        image: [item.images]
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.item
            }
        })
    })
    res.json(session.url)
})

app.get('/success', async (req, res) => {
    let { session_id } = req.query;

    let order = JSON.parse(req.query.order)

    try {
        const session = await stripeGateway.checkout.sessions.retrieve(session_id);


        let sql = `INSERT INTO orders (user_email, order_detail, date) VALUES ( '${order.email}', '${order}', current_timestamp())`;

        con.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json({ "error": "sommething is wrong" });
            } else {
                res.redirect('/checkout?payment=done');
            }
        })

    } catch {
        res.redirect('/404')
    }
})

// 404 route
app.get('/404', (req, res) => {
    res.sendFile("404.html", { root: "public" })
})

 app.use((req, res) => {
     res.redirect('/404');
 })

app.listen(3000, () => {
    console.log('listening on port 3000');
})
