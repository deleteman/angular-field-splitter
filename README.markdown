
# Field Splitter directive

_For an online example, check out_: http://rawgit.com/deleteman/angular-field-splitter/master/examples.html

Turn a single input field, into a multi-field input. This new field has the following features:

* __Default value__: Allowing for inline labels
* __Auto blur/focus__: When the users enters maxlength characters into one of the fields, the focus is automatically changed into the next field.
* __Glue string__: Used when joining the values of partial fields
* __Gracefull degradation__: If no JS is enabled, then the original input field is used.

# How do I get the value from all those new fields?

You don't! The directive updates the original field while keeping it hidden, that way you can include the directive into an already created form without having to change the way you send the information.

# How to use it?

##Installing

_Using npm_:

```
$ npm install angular-field-splitter
```

_Manual installation_:

Include ```angular-field-splitter.js``` into your project, simple!

##Using it

The main directive provided is: ```split-field```, just by adding it to an input field, it'll work.

# Attributes

There are several attributes  that can be passed, allowing for some customization:

* __split-default-value__: The text used on the input when there is no text entered by the user (default: XXX)
* __split-max-length__:    The max length allowed for that input (default: 3)
* __split-into__: Number of fields to split the original one into. (default: 3)
* __split-glue__: 				 String to be used to join the fields and their value (default: "-")
* __split-glue-original__: When updating the original input field, do we use the glue string or not? (default: true)


# Examples of use

Here are some basic code examples:

Using some of the configuration options:

```
<input type="text" name="date" field-split split-default-value="XXX" split-max-length="3" split-into="3" split-glue="-" />
```

Now using some method calls  instead of static values as attribute values:

```js
function Ctrl($scope) {

				 $scope.getDefaulValue = function() {
				 			return "***";
				 }
}

```

```
<input type="text" name="date" field-split split-default-value="getDefaultValue()" split-max-length="3" split-into="3" split-glue="-" />
``` 
# Contact me

If you have questions, or just want to send your love/hate, drop me an e-mail at: deleteman@gmail.com

#License

The MIT License (MIT)

Copyright (c) 2013 Fernando Doglio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.