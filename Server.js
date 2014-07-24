var express = require('express'),
	restful =  require('node-restful'),
	mongoose = restful.mongoose;

var app = express();
// all environments
app.set('Siddhart', 'Siddharth First');

// development only
if ('development' == app.get('env')) {
  app.set('mongodb_uri', 'mongo://localhost/dev');
}

// production only
if ('production' == app.get('env')) {
  app.set('mongodb_uri', 'mongo://localhost/prod');
}
		
mongoose.connect('mongodb://localhost/restful');

var ProductSchema = mongoose.Schema({
	Name: String,
	Sku: String,
	Price: Number
});

var Products = restful.model('Products',ProductSchema);
Products.methods(['get', 'post', 'put', 'delete']);
Products.register(app, '/api/products');

app.listen(3000);
console.log('Server is running on port 3000');