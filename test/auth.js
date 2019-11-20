const authMiddleware = require('./../middlewares/is-auth');
const expect = require('chai').expect;

describe('AuthTests', function() {
    it('should throw an error if no authorization header is present', function(){
        const req = {
            get: function(){
                return null;
            }
        }
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw('Not Authenticated');
    });
    
    it('should throw an error if authorization header is only one string', function(){
        const req = {
            get: function(){
                return 'xyz';
            }
        }
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
    });
    
    it('should throw an error if token is not verified', function(){
        const req = {
            get: function(){
                return 'xyz xyz';
            }
        }
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw('Not Authenticated');
    });
});
