import {
  Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy, ViewChild, ElementRef, ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, AfterViewInit, OnDestroy {
  @Input() element: { type: string, name: string, content: string };
  @ViewChild('header') header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) contentParagraph: ElementRef;

  constructor() {
    console.log('Constructor Called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges Called', changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit Called');
    // console.log(this.header.nativeElement.textContent); // Will fail until the afterViewInit
  }

  ngDoCheck() {
    console.log('ngDoCheck Called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit Called');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked Called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit Called');
    console.log('Header info: ', this.header.nativeElement.textContent);
    console.log('Paragraph info: ', this.contentParagraph.nativeElement.textContent);

  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked Called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy Called');
  }

  onOptionChange(change: any) {
    console.log(change);

  }
}
