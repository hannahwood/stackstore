// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./review');
require('./product');
require('./user');
require('./cartItem');
require('./order');
