import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }

  selectedHero?: Hero;

  onSelect(hero: Hero): void {
  this.selectedHero = hero;
  console.log(this.selectedHero);
}

  heroes : Hero[] = [];

  constructor(private heroService : HeroService) { }

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes (){
    this.heroService.getHeroes().subscribe({
      next: newHeros => this.heroes = newHeros,
      error : err => console.log(err)
    })
  }

}