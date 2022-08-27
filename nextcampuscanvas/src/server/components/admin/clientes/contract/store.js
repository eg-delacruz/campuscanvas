import dbConnect from '@server/dbConnect';
import config from '@server/config';
dbConnect(config.dbURL);

//Model
import Contract from '@server/components/admin/clientes/contract/model';

module.exports = {};
