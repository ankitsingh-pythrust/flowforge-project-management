import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatCardModule, MatButtonModule, MatDividerModule, MatExpansionModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public mobileMenuOpen = false;

  public categories: { id:number; name:string; items:{ id:number; text:string; done:boolean }[] }[] = [
    { id:1, name:'Personal', items:[{ id:1, text:'Read spec draft', done:false },{ id:2, text:'Plan weekend', done:false }]},
    { id:2, name:'Work', items:[{ id:1, text:'Draft PRD for Q2', done:true },{ id:2, text:'Sync with design', done:false }]}
  ];
  public selectedCategoryId: number | null = 1;
  public newCategoryName = '';
  public newItemText = '';

  public scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.mobileMenuOpen = false;
  }

  public toggleMobileMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }

  public selectCategory(id: number): void { this.selectedCategoryId = id; }

  public addCategory(): void {
    const name = (this.newCategoryName || '').trim();
    if (!name) return;
    const nextId = (this.categories[this.categories.length-1]?.id || 0) + 1;
    this.categories.push({ id: nextId, name, items: [] });
    this.newCategoryName = '';
    this.selectedCategoryId = nextId;
  }

  public addItem(): void {
    const txt = (this.newItemText || '').trim();
    if (!txt || this.selectedCategoryId === null) return;
    const cat = this.categories.find(c => c.id === this.selectedCategoryId);
    if (!cat) return;
    const nextId = (cat.items[cat.items.length-1]?.id || 0) + 1;
    cat.items.push({ id: nextId, text: txt, done: false });
    this.newItemText = '';
  }

  public toggleDone(catId: number, itemId: number): void {
    const cat = this.categories.find(c => c.id === catId);
    if (!cat) return;
    const item = cat.items.find(i => i.id === itemId);
    if (item) item.done = !item.done;
  }

  public removeItem(catId: number, itemId: number): void {
    const cat = this.categories.find(c => c.id === catId);
    if (!cat) return;
    cat.items = cat.items.filter(i => i.id !== itemId);
  }
}
