/* jQuery checkAvailability plugin
 * Examples and documentation at: http://www.jqeasy.com/
 * Version: 1.0 (22/03/2010)
 * No license. Use it however you want. Just keep this notice included.
 * Requires: jQuery v1.3+
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function($){
    $.fn.checkAvailability = function(opts) {
      opts = $.extend({
      target: '#usernameResponse',
      trigger: '#btnCheck',
      ajaxSource: 'api/v1/auth/check-username-availability',
      fireOnKeypress: true
        }, opts || {});

    var $this = $(this);

    if (opts.fireOnKeypress) {
      $this.keyup(function() {
        checkUsername();
      });

      $this.keypress(function(event) {
        if (event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });
    };

    $(opts.trigger).click(function() {
      checkUsername();
        });

    function checkUsername() {
      if (validateUsername()) {
        $(opts.target).html('<img src="/core/images/loading.gif">');
        usernameLookup();
      }
    };

    function usernameLookup() {
      var val = $this.val();
      $.ajax({
          url: opts.ajaxSource,
          data: {username:val,s:Math.random()},
          success: function(data){
            if(data.isAvaible){
              $(opts.target).html('<i class="glyphicon glyphicon-ok"></i>');
              $('.user-signup-form').bootstrapValidator('updateStatus', $('#username'), 'VALID', 'notEmpty' )
            }else{
              $(opts.target).html('<i class="glyphicon glyphicon-remove"></i>');
              $('.user-signup-form').bootstrapValidator('updateStatus', $('#username'), 'INVALID', 'notEmpty' )
              $('.user-signup-form').bootstrapValidator('updateMessage', $('#username'), 'notEmpty', 'O  nome de usuário não está disponível')
            }
          },
          error:function (){
            $(opts.target).html('Erro validando o nome de usuário.');
          }
      });
    };

    function validateUsername(str) {
      return (/^[A-Za-z]{3,20}$/.test($this.val()));
    };
  };
})(jQuery);