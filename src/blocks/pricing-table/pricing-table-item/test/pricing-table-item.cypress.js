/*
 * Include our constants
 */
import * as helpers from '../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Pricing Table Item Block', function() {
	/**
	   * Setup Pricing Table Item data
	   */
	const pricingTableItemData = {
		title: 'Plan 1',
		currency: '$',
		amount: '33',
		features: 'Lorem ipsum dolor.',
		buttonText: 'Consectetur.',
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	   * Test that we can add a pricing-table-item block to the content, not alter
	   * any settings, and are able to successfully save the block without errors.
	   */
	it( 'Test pricing-table-item block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'pricing-table' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'pricing-table-item' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-pricing-table-item' ).should( 'not.exist' );

		helpers.editPage();
	} );

	/**
	   * Test that we can add a pricing-table block to the content, add text
	   * adjust colors and are able to successfully save the block without errors.
	   */
	it( 'Test pricing-table block saves with content values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB, title, currency, amount, features, buttonText } = pricingTableItemData;
		helpers.addCoBlocksBlockToPage( true, 'pricing-table' );

		cy.get( '.wp-block-coblocks-pricing-table-item' ).first().click().then( $firstItem => {
			cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__title' ).click( { force: true } ).clear().type( title );
			cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__currency' ).click( { force: true } ).clear().type( currency );
			cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__amount' ).click( { force: true } ).clear().type( amount );
			cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__features' ).click( { force: true } ).clear().type( features );
			cy.get( $firstItem ).find( '.wp-block-button' ).find( 'div[role="textbox"]' ).click( { force: true } ).clear().type( buttonText );

			cy.get( $firstItem ).click();
			helpers.setColorSetting( 'background color', backgroundColor );
			helpers.setColorSetting( 'text color', textColor );
		} );

		helpers.savePage();

		helpers.checkForBlockErrors( 'pricing-table' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-pricing-table' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-pricing-table-item' ).first()
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		cy.get( '.wp-block-coblocks-pricing-table-item' ).first()
			.then( $firstItem => {
				cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__title' ).should( 'have.html', title );
				cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__currency' ).should( 'have.html', currency );
				cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__amount' ).should( 'have.html', amount );
				cy.get( $firstItem ).find( '.wp-block-coblocks-pricing-table-item__features > li' ).should( 'have.html', features );
				cy.get( $firstItem ).find( '.wp-block-button > a' ).should( 'have.html', buttonText );
			} );

		helpers.editPage();
	} );
} );