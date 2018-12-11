module.exports = function(context) {
  const Client = context('pgClient');
  const configConstructor = context('config');
  const config = configConstructor(context);

  function getClient() {
      return new Client({
          host: config.pgHost,
          user: config.pgUser,
          password: config.pgPassword,
          database: config.pgDatabase,
      });
  }

  let client = getClient();
  setTimeout(() =>
      client.connect((err) => {
          if (err) {
            console.log('failed to connect to postgres!');
          }
          else{
            console.log('successfully connected to postgres!');
          }
  }), 2000);
  
  return {

      insertResult: (won, score, total, onSuccess, onError) => {
          let client = getClient();
          client.connect((err) => {
              if (err) {
                  onError(err);
                  client.end();
              } else {
                  const query = {
                      text: 'INSERT INTO "GameResult"("Won", "Score", "Total", "InsertDate") VALUES($1, $2, $3, CURRENT_TIMESTAMP);',
                      values: [won, score, total],
                  };
                  client.query(query, (err) => {
                      if (err) {
                        onError();
                      }
                      else {
                        onSuccess();
                      }
                      client.end();
                  });
              }
          });
          return;
      },

      getTotalNumberOfGames: (onSuccess, onError) => {
        let client = getClient();
        client.connect((err) => {
            if (err) {
                onError(err);
                client.end();
  
            } else {
                const query = {
                    text: `SELECT COUNT(*) FROM "GameResult";`
                };
                client.query(query, (err, res) => {
                    if (err) {
                      onError();
                    }
                    else {
                      onSuccess(res.rows[0].count);
                    }
                    client.end();
                });
            }
        });
        return;
    },

      getTotalNumberOfWins: (onSuccess, onError) => {
        let client = getClient();
        client.connect((err) => {
            if (err) {
                onError(err);
                client.end();
  
            } else {
                const query = {
                    text: `SELECT COUNT(*) FROM "GameResult" WHERE "Won"=true;`
                };
                client.query(query, (err, res) => {
                  if (err) {
                    onError();
                  }
                  else {
                    onSuccess(res.rows[0].count);
                  }
                  client.end();
              });
            }
        });
        return;
    },

      getTotalNumberOf21: (onSuccess, onError) => {
        let client = getClient();
        client.connect((err) => {
            if (err) {
                onError(err);
                client.end();
  
            } else {
                const query = {
                    text: `SELECT COUNT(*) FROM "GameResult" WHERE "Score"=21;`
                };
                client.query(query, (err, res) => {
                  if (err) {
                    onError();
                  }
                  else {
                    onSuccess(res.rows[0].count);
                  }
                  client.end();
              });
            }
        });
        return;
    },
  };
};
