/*
	Example:

	<input type="text" name="date" splitField split-default="XXX" split-max-length="3" split-into="3" split-glue="-" />
*/

/**

Usar esta otra directiva para simplificar el codigo que genera los partial fields
*/
angular.module("fieldSplitter", []).
	directive("partialField", function() {
		/**
 		 * Gets the combined input from all of the parts 
 		 */
		function getCombinedInput(scope, glueOriginal, glue) {
			var inputs = [];
			$(scope.fields).each(function(i, e) {
				inputs.push($(e).children().first().val());
			});
			glueOriginal = (glueOriginal.toLowerCase() === "true");
			return inputs.join((glueOriginal)? glue : "");
		}

		return {
			restrict: 'E',
			scope: {
				pfType: "@",
				pfDefaultValue: "@",
				pfMaxLength: "@",
				pfGlue: "@",
				pfGlueOriginal: "@"
			},
			template: '<input data-ng-keyup="handleKeyup();" data-ng-focus="handleFocus();" data-ng-blur="handleBlur()" type="{{pfType}}" value="{{pfDefaultValue}}" pf-default-value="{{pfDefaultValue}}" maxlength="{{pfMaxLength}}" />',
			link: function(scope, element, attrs) {
				scope.handleKeyup = function(){

					var field = $(element.children()[0]);
					$(scope.$parent.originalElement).val(getCombinedInput(scope.$parent, scope.pfGlueOriginal, scope.pfGlue)); //Every time the user adds input, the original field is updated

					setTimeout(function() { $(scope.$parent.originalElement).trigger("input"); }, 10);
					if(field.val().length == field.attr("maxlength")) {
						if(!field.hasClass("last-field")) {
							setTimeout(function() {
								field.parent().next().children().first().focus();
							}, 10);
						}
					}					
				};

				scope.handleFocus = function() {
					var $this = $(element.children()[0]);
					$this.addClass("active");
					if($this.val() == $this.attr("pf-default-value")) {
						$this.val("");
					} 
				};

				scope.handleBlur = function() {
					var $this = $(element.children()[0]);
					if($this.val() == "") {
						$this.removeClass("active");
						$this.val($this.attr("pf-default-value"));
					} 
				};

			}
		}
	}).directive('splitField', function($compile) {
		
		function createPartialFields(container, opts, scope) {
			var totalFields = opts.numberOfFields;
			scope.fields = [];
			for(var idx = 0; idx < totalFields; idx++) {
				var f = getPartialField(opts, scope, idx);
				scope.fields.push(f);
				container.append(f);
				if(idx < totalFields - 1) {
					container.append(opts.glue);
				}
			}
		}

		/**
			 Returns the code for a partial field (using the partial-field directive)
		*/
		function getPartialField(opts, scope, idx) {
			var newField = '<partial-field pf-type="'+opts.type+'" pf-default-value="'+opts.defaultValue+'" pf-max-length="'+opts.maxLength+'" pf-glue="'+opts.glue+'" pf-glue-original="'+opts.glueOriginal+'"/>';
			var elem = $compile(newField)(scope);
			return elem;
		}

		return {
			scope: true,
			link: function(scope, elem, attrs) {
				/** Default values */
				var	DEFAULT_NUMBER_OF_FIELDS = 3;
				var DEFAULT_VALUE = "XXX";
				var DEFAULT_MAX_LENGTH = 3;
				var DEFAULT_GLUE = "-"; 
				var DEFAULT_GLUE_ORIGINAL = true;

				var $elem = $(elem);
				
				var options = {
					type: $(elem).attr("type"),
					defaultValue: attrs.splitDefaultValue ? attrs.splitDefaultValue : DEFAULT_VALUE,
					maxLength: attrs.splitMaxLength ? attrs.splitMaxLength : DEFAULT_MAX_LENGTH,
					numberOfFields: attrs.splitInto ? attrs.splitInto : DEFAULT_NUMBER_OF_FIELDS,
					glue: attrs.splitGlue ? attrs.splitGlue : DEFAULT_GLUE,
					glueOriginal: attrs.splitGlueOriginal ? attrs.splitGlueOriginal : DEFAULT_GLUE_ORIGINAL
				};

				scope.originalElement = $elem;
				var parentElement = $elem.parent();
				$elem.hide(); //we hide the original element

				createPartialFields(parentElement, options, scope);
			}
		}
	});
