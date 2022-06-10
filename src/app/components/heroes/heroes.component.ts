import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero/hero.service';
import { MessageService } from 'src/app/services/message/message.service';

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

  // selectedHero?: Hero;

//   onSelect(hero: Hero): void {
//     this.selectedHero = hero;
//     this.messageService.add(`HeroesComponent: hai selezionato l'hero con id = ${this.selectedHero.id}`);
// }

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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe({
        next: (hero) => this.heroes.push(hero),
        error: (err) => console.log(err)
      });
  }


  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe({
      next: (hero) => this.heroes = this.heroes.filter(h => h.id !== hero.id),
      error: (err) => console.log(err)
    });
  }

}
