const assert = require('assert');
const dss = require('../dss');
const fs = require('fs');
const path = require('path');

describe('Core tests', function() {

    it('should should parse the data', function() {
        const file = fs.readFileSync(path.join(__dirname, 'data/button.scss'), 'utf8');

        dss.parse(file, {}, function(parsed) {
            const data = parsed.blocks[0];

            assert.strictEqual(data.name, 'Button');
            assert.strictEqual(data.description, 'Your standard form button.');
            assert.strictEqual(data.state[0].name, ':hover');
            assert.strictEqual(data.state[0].description, 'Highlights when hovering.');
            assert.strictEqual(data.state[1].name, ':disabled');
            assert.strictEqual(data.state[1].description, 'Dims the button when disabled.');
            assert.strictEqual(data.state[2].name, '.primary');
            assert.strictEqual(data.state[2].description, 'Indicates button is the primary action.');
            assert.strictEqual(data.state[3].name, '.smaller');
            assert.strictEqual(data.markup.example,
                '   <span>\n' +
                '     <button>This is a button</button>\n' +
                '   </span>'
            );
            assert.strictEqual(data.markup.escaped,
                '   &lt;span&gt;\n' +
                '     &lt;button&gt;This is a button&lt;/button&gt;\n' +
                '   &lt;/span&gt;'
            );
        });
    });

    it('multiline markup is correctly parsed when not as last parser', function() {
        const file = fs.readFileSync(path.join(__dirname, 'data/markup-not-last.scss'), 'utf8');

        dss.parse(file, {}, function(parsed) {
            const data = parsed.blocks[0];

            assert.strictEqual(data.name, 'Button');
            assert.strictEqual(data.description, 'Your standard form button.');
            assert.strictEqual(data.markup.example,
                '   <span>\n' +
                '     <button>This is a button</button>\n' +
                '   </span>'
            );
            assert.strictEqual(data.markup.escaped,
                '   &lt;span&gt;\n' +
                '     &lt;button&gt;This is a button&lt;/button&gt;\n' +
                '   &lt;/span&gt;'
            );
        });
    });

});
