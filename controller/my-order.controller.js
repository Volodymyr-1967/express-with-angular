const {Pool} = require('pg');
const connectionString = 'postgres://yaxbtzrl:ogaKU0YCAZn3TpvYAevmX24dvo5bxTcr@tyke.db.elephantsql.com/yaxbtzrl';

const pool = new Pool({
  connectionString,
});

class MyOrderController {

  createOrder(req, res) {
    const {name, phone} = req.body;
    pool.query(`INSERT INTO myOrder (name, phone) VALUES ($1, $2)`, [name, phone], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows);
    });
  }

  getOrders(req, res) {
    pool.query(`SELECT * FROM myOrder ORDER BY ID ASC`, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

  getOneOrder(req, res) {
    const id = req.params.id;
    pool.query('SELECT * FROM myOrder WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }

  updateOrder(req, res) {
    const {id, name, phone} = req.body;
    pool.query(`UPDATE myOrder set name = $1, phone = $2 WHERE id = $3 RETURNING *`, [name, phone, id], (error, results) => {
      if (error) {
        throw error;
      }
        res.status(200).json(results.rows);
    });
  }

  deleteOrder(req, res) {
    const id = req.params.id;
    pool.query(`DELETE FROM myOrder where id = $1`, [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({message: `Deleted order with id: ${id}`});
    });
  }

}

module.exports = new MyOrderController();
