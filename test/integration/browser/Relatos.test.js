// var Browser = require('zombie');
// var assert = require('assert');
// var helpers = require('../../browser.helpers.js');

// var HOST = global.HOST;

// // Load the page from localhost
// var browser = new Browser();
// browser.silent = false;
// browser.debug = true;


// function relatoStub () {
//   return {
//     titulo: 'Gestão Federal das condicionalidades de saúde do Programa Bolsa Família',
//     descricao: 'O PBF é um programa federal de transferência direta de renda para famílias em situação de pobreza ou em extrema pobreza, criado pela Lei nº 10.836/2004 e regulamentado pelo Decreto nº 5.209/2004. Considerando a finalidade de promover o acesso das famílias aos direitos sociais básicos e romper com o ciclo intergeracional da pobreza, o programa vincula o recebimento do auxílio financeiro ao cumprimento de condicionalidades na saúde, educação e assistência social pelas famílias beneficiárias.',
//     periodoInicial:'321',
//     periodoFinal: '321'
//   };
// }

// describe('Relatos', function() {
//   describe('Authenticated', function() {
//     var user = null;
//     // login user
//     before(function(done) {
//       this.timeout(20000);

//       browser.visit(HOST+'/', function (e) {
//         if (e) {
//           console.error(e);
//           return done(e);
//         }
//         if (browser.error) {
//           console.dir('Errors reported:', browser.errors);
//           return done(browser.error);
//         }

//         helpers.createUserAndLogin(browser, function(err, dbUser){
//           user = dbUser;
//           done();
//         })
//       })
//     })

//     describe('Criar', function() {
//       var classeDoFormDeCriarRelato = 'form[name=formCriarRelato]';

//       // adicionando tempo extra pois esse teste é bem grande
//       this.timeout(15000);

//       /**
//        * Verifica se o criar relato com a modal está functionando
//        */
//       it('should create one relato with relato modal', function (done) {
//         var relato = relatoStub();

//         browser.visit(HOST+'/relatos', function (e) {
//         if (e) {
//           console.error(e);
//           return done(e);
//         }
//         if (browser.error) {
//           console.dir('Errors reported:', browser.errors);
//           return done(browser.error);
//         }

//         // check se está na página de relatos
//         browser.assert.attribute('body', 'class', 'ember-application relatos relatos-index');
//         // checa se existe o botão de criar relato
//         assert.ok(browser.query('.criar-relato-link'),'Não foi possível encontrar o botão de ativar o modal de criar relatos');
//         // checa se o modal existe
//         assert.ok(browser.query('.add-relato-modal'), 'Não foi possível encontrar o modal de criar relatos');

//         // clica no botão de criar relato para exibir o modal
//         browser.clickLink('.criar-relato-link', function(e) {
//           if (e) {
//             console.error(e);
//             return done(e);
//           }

//           // verifica se o modal de ćriar relato está aberto
//           browser.assert.attribute('body', 'class', 'ember-application relatos relatos-index modal-open');

//           // preenche o título e descrição do relato
//           browser.
//             fill(classeDoFormDeCriarRelato + ' input[name=titulo]', relato.titulo);
//           browser.fill(classeDoFormDeCriarRelato + ' textarea[name=descricao]', relato.descricao);

//           browser.pressButton(classeDoFormDeCriarRelato + ' button[name=criar]',function(e) {
//             if (e) {
//               console.error('error>',e);
//               return done(e);
//             }
//             if (browser.error) {
//               console.dir('Errors reported:', browser.errors);
//               return done(browser.error);
//             }

//             // TODO add more tests and result validations
//             //
//             //sails.log.warn('>>>', browser.html());
//             sails.log.warn('>> cabou');
//             return done();
//           });
//         });

//       });
//       });
//     });
//   });
// });