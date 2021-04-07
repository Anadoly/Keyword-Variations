context('Keyword Variations', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Create a New Sub-query');
  });
  it('Check NetWork Requests', () => {
    cy.request('http://localhost:3001/keyWords?word=اتصالات')
      .should((response) => {
        expect(response.status).to.eq(200);
      })
      .its('body')
      .should('be.an', 'array')
      .and('have.length', 1)
      .its('0')
      .should('contain', {
        word: 'اتصالات',
      });
  });
  it('Test When Query Mode Is OFF ', () => {
    cy.get('#query-mode')
      .invoke('attr', 'aria-checked')
      .should('equal', 'false');
    cy.get('textarea').should(($textarea) => {
      expect($textarea).to.have.length(3);
    });
    cy.get('#any').type('اتصالات,');
    cy.get('#variations > div').should(($variation) => {
      expect($variation).to.have.length(1);
      expect($variation.eq(0)).to.contain('اتصالات');
    });
    cy.get('#any').type('فودافون, اورنج');
    cy.get('#variations > div').should(($variation) => {
      expect($variation).to.have.length(2);
      expect($variation.eq(0)).to.contain('فودافون');
    });
    cy.get('#any').type(', سوق');
    cy.get('#variations > div').should(($variation) => {
      expect($variation).to.have.length(3);
      expect($variation.eq(0)).to.contain('سوق');
    });
    cy.get('#and').type('بنك');
    cy.get('#variations > div').should(($variation) => {
      expect($variation).to.have.length(1);
      expect($variation.eq(0)).to.contain('بنك');
    });
    cy.get('#not').type('بنك مصر');
    cy.get('#variations > div').should(($variation) => {
      expect($variation).to.have.length(1);
      expect($variation.eq(0)).to.contain('بنك مصر');
    });
  });

  it('Test When Query Mode Is ON ', () => {
    cy.get('label[for=query-mode]').click();
    cy.get('#query-mode')
      .invoke('attr', 'aria-checked')
      .should('equal', 'true');
    cy.get('textarea').should(($textarea) => {
      expect($textarea).to.have.length(1);
    });
    cy.get('#boolean-query').type('اتصالات');
    cy.get('#variations > div').should(($variation) => {
      expect($variation.eq(0)).to.contain('اتصالات');
    });
    cy.get('#boolean-query').type('Or فودافون Or ورنج');
    cy.get('#variations > div').should(($variation) => {
      expect($variation.eq(0)).to.contain('فودافون');
    });
    cy.get('#boolean-query').type('OR سوق');
    cy.get('#variations > div').should(($variation) => {
      expect($variation.eq(0)).to.contain('سوق');
    });
  });

  it('Test Copy Variations ', () => {
    cy.get('#variations > div').should(($variation) => {
      expect($variation).to.have.length(3);
    });
    cy.get('#variations > div')
      .first()
      .find('button')
      .should('contain', 'Copy All');
    cy.get('#variations > div').first().find('button').click();
    cy.get('#variations > div')
      .first()
      .find('button')
      .should('contain', 'Copied');
    cy.get('#variations > div')
      .last()
      .find('button')
      .should('contain', 'Copy All');
    cy.get('#variations > div').last().find('button').click();
    cy.get('#variations > div')
      .last()
      .find('button')
      .should('contain', 'Copied');
    cy.get('#variations > div')
      .first()
      .find('button')
      .should('contain', 'Copy All');
  });
});
