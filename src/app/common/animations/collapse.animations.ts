import {animate, group, query, state, style, transition, trigger} from "@angular/animations";

export const BOOKS_ANIMATION_TIMING = "225ms cubic-bezier(0.4,0.0,0.2,1)";

export enum BookState {
    Collapsed = "collapsed",
    Expanded = "expanded"
}

export const bookTrigger = trigger("bookState", [
    state("collapsed, void", style({width: "0%", visibility: "hidden"})),
    state("expanded", style({width: "50%", visibility: "visible"})),
    transition(
        "expanded => collapsed, void => expanded, expanded => void",
        animate(BOOKS_ANIMATION_TIMING)
    )
]);

export const bookListTrigger = trigger("bookListState", [
    state("collapsed", style({width: "50%"})),
    state("expanded", style({width: "100%"})),
    transition(
        "expanded => collapsed, expanded => void",
        group([
            query(".animation-col-collapse", animate(BOOKS_ANIMATION_TIMING, style({"flex-basis": "0%", visibility: "hidden"}))),
            animate(BOOKS_ANIMATION_TIMING)
        ])
    ),
    transition(
        "collapsed => expanded",
        group([
            query(".animation-col-collapse", style({"flex-basis": "0%"})),
            query(".animation-col-collapse", animate(BOOKS_ANIMATION_TIMING, style({"flex-basis": "100%", visibility: "visible"}))),
            animate(BOOKS_ANIMATION_TIMING)
        ])
    )
]);
