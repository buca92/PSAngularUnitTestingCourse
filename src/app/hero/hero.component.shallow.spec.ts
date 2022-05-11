import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe('Hero Component (shallow tests)', () => {
	let fixture: ComponentFixture<HeroComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ HeroComponent ],
			schemas: [ NO_ERRORS_SCHEMA ] // solves following error: "ERROR: 'NG0303: Can't bind to 'routerLink' since it isn't a known property of 'a'.'"
		});
		fixture = TestBed.createComponent(HeroComponent);
	})

	it('should have the correct hero', () => {
		fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
		fixture.detectChanges(); // it is always needed in shallow integration tests

		expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
	})

	it('should render the hero name in an anchor tag', () => {
		fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
		fixture.detectChanges(); // if we would not perform this then the <a> text contant would be empty! => it updates all bindings

		let deA = fixture.debugElement.query(By.css('a'));
		expect(deA.nativeElement.textContent).toContain('SuperDude'); // does exactly the same like the one below

		expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
	})

})