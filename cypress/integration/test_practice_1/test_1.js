describe('Browsing webpage', () => {
    
    it('should overwright the current time', () => {
        const date = new Date(2022,4,1).getTime();
        //variable date is defined and assigned to Date we want 
        //and  it returns timestamp
        cy.clock(date);
        //by clock function with date variable as 
        //argument we hardcoded date to all our tests
        cy.log(date);//we logged hardcoded time


    })
    
    it('should visit given url', () => {
        cy.visit('http://example.com', { timeout: 10000});
        //cy.login('username', 'password');
    })

    it('should check correct url', () => {
        cy.url().should('include','example.com');
    })

    it('should wait 3 s', () => {
        cy.wait(3000)
    })

    it('should pause 3 s', () => {
        cy.pause()
    })

    it('should check correct url', () => {
        cy.get('h1').should('be.visible');
    
    })

    
})

describe('Visiting webpage', () => {
    it('should load books webpage', () => {
        cy.visit('http://books.toscrape.com/index.html', { timeout : 10000 })
        //visit goes with timeout, after is typically cy.url should
        cy.url().should('include', 'index.html')
        cy.log('before reload')
        cy.reload()
        cy.log('after reload')
        //reload function is always
        //recommended to check data 
        //availability after reload
    
    }) 

    

    it('should load travel page', () => {
        cy.get('a')
            .contains('Travel')
            .click()
        cy.get('h1').contains('Travel')
    }) 

    it('should display correct number of elements', () => {
        //ako treba proveriti da li imamo tacan
        //broj elemenata na stranici
        cy.get('.product_pod').its('length').should('eq',11)
        
    }) 
//ako u novoj kategoriji treba proveriti 
//cenu knjige tada se slozena radnja 
//izdeli na vise test stepova i 
//za svaki ide poseban it block 
//sa svojim test stepom
    it('open the new book style - Poetry - test step 1', () => {
        cy.get('a')
            .contains('Poetry')
            .click()
        //onda proveriti da li ima na web srtani 
        //sadrzaj Poetry
        cy.get('h1').contains('Poetry') 
               
    }) 

    it('naci knjigu Olio - test step 2', () => {
        cy.get('a').contains('Olio')    
              
    }) 

    it('proveriti cenu za knjigu Olio - test step 3', () => {
        cy.get('.price_color').contains('£23.88')    
        cy.log('The price is as espected')
        //good to have some comments on tests      
    }) 
   
        
})


describe('Visiting zero.webappsecurity.com', () => {
    it('should load login page', () => {
        cy.visit('http://zero.webappsecurity.com/login.html', { timeout : 10000 })
        //visit goes with timeout, after is typically cy.url should
        cy.clearCookies( { log : true });//by adding log true - we can see these details in cypress tests logs
        //cookies cleared
        cy.clearLocalStorage('your item', {log : true});
        //local storage cleared
        cy.title().should('include','Zero - Log in');
        //row above checks the content of the title 
        //in webpage, looked in head section when 
        //webpage is inspected - it is always done
        //in production environemnts
        //it is always done with title function
        //followed by should and than include or equal
        cy.url().should('include', 'login.html')
        cy.log('before reload')
        cy.reload()
        cy.log('after reload')
        //reload function is always
        //recommended to check data 
        //availability after reload
    
    }) 

    it('should fill username', () => {
        cy.get('#user_login').as('username');//defining the Alias for selector #user_login
        //cy.get('#user_login').clear();//when the Alias
        // from above row is not defined.
        //When id is available it is recommended to 
        //grab this element and after it to use 
        //clear() function  - it clears the 
        //value of the text or input area
        //cy.get('#user_login').type('Some invalid username',{delay : 100});
        //when the Alias from above row is not defined
        cy.get('@username').clear();
        //if Alias is defined we use 
        //@alias_name instead of selector
        //like in previous and next active row
        //it is usefull if a selector is repeated 
        //in many tests, only Alias should be changed
        cy.get('@username').type('Some invalid username',{delay : 100});
    })

    it('should fill password', () => {
        cy.get('#user_password').as('password');
        //cy.get('#user_password').clear();
        //previous and next line is without Alias
        //cy.get('#user_password').type('Incorrect password',{delay : 100});
        cy.get('@password').clear();
        cy.get('@password').type('Incorrect password',{delay : 100});      
        cy.log('@password is established instead of #user_password selector ')

    })

    it('Mark the checkbox', () => {
        cy.get('input[type="checkbox"]').click();//input 
        //after checkbox inspection we have 
        //<input type="checkbox" id="user_remember_me" 
        //name="user_remember_me" tabindex="3">
        cy.wait(5000)
    })

    it('should submit login form', () => {
        cy.contains('Sign in').click();//for value
        //elemenat if defined
        //there is no cy.get() but directly 
        //contains('Sign in').click()
    })

    it('should display error message', () => {
        cy.get('.alert-error').should('be.visible');
        cy.log('single asertion');
        cy.get('.alert-error').should('be.visible').and('contain','Login and/or password are wrong.');
        cy.log('multiple asertion chaining')
        //multiple asertions with and() function
        //checks if display message exists and its content
        //by multiple assertions with and() functions
        /*THIS TEST IS GOOD EXAMPLE FOR CHAINING
        MULTIPLE ASERTIONS, THAT ENABLE TO CHECK 
        MORE THEN THE ELEMENT IS JUST VISIBLE
        LIKE FOR EXAMPLE TO CHECK IF THE CONTENT 
        OF ERROR MESSAGE IS CORRECT with and() function
        and('contain','Login and/or password are wrong.')
        Moreover,class alert-error is used, 
        after element inspection for this class 
        there is a value class="alert alert-error" ,
        only part of it after space is considered
        alert-error with should('be.visible') 
        to check for display error message*/
    })
})

describe('Device tests', () => {
    it('UHD', () => {
        cy.viewport(3840,2160);
        //viewport is a function enable to run test
        //from determined perspective - emulating 
        //a device with specific resolution
        cy.visit('http://www.example.com');
        cy.wait(2000)   
    })


    it('1080', () => {
        cy.viewport(1980,1080);
        //viewport is a function enable to run test
        //from determined perspective - emulating 
        //a device with specific resolution
        cy.visit('http://www.example.com');
        cy.wait(2000)   
    })

    it('iPhone X', () => {
        cy.viewport('iphone-x');
        //viewport is a function enable to run test
        //from determined perspective - emulating 
        //a device with specific resolution
        //for some devices it is supported to type
        //device model - like 'iphone-x'
        cy.visit('http://www.example.com');
        cy.wait(2000)   
    })

    it('iPad Mini', () => {
        cy.viewport('ipad-mini');
        //viewport is a function enable to run test
        //from determined perspective - emulating 
        //a device with specific resolution
        //for some devices it is supported to type
        //device model - like 'ipod-mini'
        cy.visit('http://www.example.com');
        cy.wait(2000)   
    })

    it('Macbook 15', () => {
        cy.viewport('macbook-15');
        //viewport is a function enable to run test
        //from determined perspective - emulating 
        //a device with specific resolution
        //for some devices it is supported to type
        //device model - like 'macbook-15'
        cy.visit('http://www.example.com');
        cy.wait(2000)   
    })
})

describe('Login with Fixtures data', () => {
    it('should try to login', () => {
        cy.visit('http://zero.webappsecurity.com/login.html');
        cy.fixture('user').then(user => {
            //calls the content of defined user.json 
            //from fixtures folder and 
            //assign their values to new varialbes 
            //in next 2 rows
            const username = user.username;
            const password = user.password;
            cy.get('#user_login').type(username);
            //prvo u username upisuje 
            //sta smo upisali u fixtures z za username 
            //i password u ovom slucaju
            cy.get('#user_password').type(password)
            //onda klikne na next button
            cy.contains('Sign in').click()
            cy.log('signed in by using Fixtrues')
        })
    })
})

describe('Keyboard press simulation', () => {
    it('should submit searchbox with pressing enter', () => {
        cy.visit('http://zero.webappsecurity.com/index.html');
        cy.get('#searchTerm').type('just some text {enter}');
        //id locator is used followed by type function 
        //in the row above in type function there 
        //is within curle brackets the 
        //keybord command, in this case ENTER
        //this is useful if there is no button 
        //available on webpage
    })
})


describe('Select box', () => {
    it('should load website with select box', () => {
        cy.visit('https://devexpress.github.io/testcafe/example/');
    })

    it('should select an option from select box', () => {
        cy.get('#preferred-interface').select('Both');
        //within the #id selector preferred-interface
        //there are 3 options available and one of 
        //tham is grabed
        cy.get('#preferred-interface').should('have.value', 'Both');
        //than it is checked with should that 
        //it has the value we want to pick

         //another value from select box
        cy.get('#preferred-interface').select('JavaScript API');
        cy.get('#preferred-interface').should('have.value', 'JavaScript API');

        
    })
})

describe('Screenshots', () => {
    it('full page screenshot', () => {
        cy.visit('https://devexpress.github.io/testcafe/example/', { timeout: 5000} );
        //greb the url of webpage we want to screenshot
        cy.screenshot({capture: 'fullPage' });
        //fullpage screenshot
           })

    it('single element screenshot', () => {
        cy.visit('https://devexpress.github.io/testcafe/example/');
        cy.get('header').screenshot();
        //screenshots of the specific elements 
        //that are inspected first for selectors
        cy.get('#populate').screenshot();
    })
})

describe('Visiting polovniautomobili.com', () => {
    it('should load polovniautomobili login webpage', () => {
        cy.visit('https://www.polovniautomobili.com/login', { timeout : 10000 })
        //visit goes with timeout, after is typically cy.url should
        cy.url().should('include', 'login')
    
    }) 


})