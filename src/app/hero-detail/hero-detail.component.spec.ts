import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('Hero Detail Component', () => {
	let mockActivatedRoute;
	let mockHeroService;
	let mockLocation;
	let fixture: ComponentFixture<HeroDetailComponent>;

	beforeEach(() => {
		mockActivatedRoute = {
			snapshot: {
				paramMap: {
					get: () => { return '3'; }
				}
			}
		}
		mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
		mockLocation = jasmine.createSpyObj(['back']);

		TestBed.configureTestingModule({
			declarations: [HeroDetailComponent],
			imports: [FormsModule],
			providers: [
				{ provide: ActivatedRoute, useValue: mockActivatedRoute },
				{ provide: HeroService, useValue: mockHeroService },
				{ provide: Location, useValue: mockLocation }
			]
		});

		fixture = TestBed.createComponent(HeroDetailComponent);

		mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }))
	})

	it('should render hero name in a <h2> tag', () => {
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
	})

	it('should call updateHero when save is called (async)', fakeAsync(() => { // async code is now synchronous
		mockHeroService.updateHero.and.returnValue(of({}));
		fixture.detectChanges();

		fixture.componentInstance.save();
		// tick(250); // calls any function runned in the time zone of 250 ms
		flush(); // check if any call is waiting and perform it immediatelly?

		expect(mockHeroService.updateHero).toHaveBeenCalled();
	}))

	it('should call updateHero when save is called (async with Promise)', waitForAsync(() => { // not so recommended, fakeAsync is more prefered one
		mockHeroService.updateHero.and.returnValue(of({}));
		fixture.detectChanges();

		fixture.componentInstance.saveWithPromise();

		// waits for resolved promise
		fixture.whenStable().then(() => {
			expect(mockHeroService.updateHero).toHaveBeenCalled();
		});
	}))

})