var Slot = Backbone.Model.extend({
    defaults: {
        status:'facedown'
    },
    display: function() {
        return this.get('face');
    }
});

var Slots = Backbone.Collection.extend({
  model: Slot,
  //comparator: 'cid',
  match: function(here,there) {// here & there are models
    return (here.get('group') === there.get('group'));
  },
  there:null,
  restart: function() {
    this.reset(this.shuffle());
    this.models.forEach(function(it) {it.set(it.defaults)});
  },
  lift: function(here) { //here is a model, not a number
    var there = this.there;
    if (here.get('status') !== 'facedown') return false;
    if (there===here) return false;
    if (there === null) {
    // no current face-up
        this.there = here;
        here.set('status','faceup');
    } else {
    // must match face-up
        if (this.match(here,there)) {
            here.set('status','matched');
            there.set('status','matched');
            //checkGameover();
        } else {
            here.trigger('change',here);// fake a change event, leaving status 'facedown'
            there.set('status','facedown');
        }
        this.there = null;
    }
    return here.get('face');
  }
}); // end Slots

var slots = new Slots();

slots.add(
            [{face:'Cat',group:1},{face:'Kitten',group:1},
			{face:'Dog',group:2},{face:'Puppy',group:2},
            {face:'Bird',group:3},{face:'Chick',group:3},
            {face:'Frog',group:4},{face:'Tadpole',group:4},
            {face:'Whale',group:5},{face:'Calf',group:5},
            {face:'Sheep',group:6},{face:'Lamb',group:6},
      ]);


var MemoryGame = (function() {
    return function(gui,collection) {
        this.lift = function(where) {
            console.log('where='+where);
            gui.show(where,collection[where].get('face'));
        }
    }
})();

var MemoryGUI = (function() { // begin IIFE

var SlotView = Backbone.View.extend({
  //personal props:
  // model, id
  //shared props:
  tagName: 'div',
  events: {
    'click': 'tryLift'
  },
  tryLift: function() {
      slots.lift(this.model);
    },
  initialize: function() {
    this.listenTo(this.model, 'change',this.update);
    this.$el.addClass('memoryCell');
    this.$el.appendTo('#memorygrid');
  },
  update: function(model) {
    this.show(); // turn faceup now
    var me = this;
    // maybe unshow later:
    if (model.get('status') !== 'faceup') {
        window.setTimeout(function() {
            me.unshow();
        },1000);
    }
  },
  unshow: function() { //either hide or remove
    var status = this.model.get('status');
    if (status == 'matched')
        this.remove();
    else this.hide();
  },
  restore: function() {
    this.$el.removeClass('faceup').removeClass('missing');
  },
  show: function() {
    this.$el.attr('value',this.model.get('face'));
    this.$el.addClass('faceup');
  },
  remove: function() {
    this.$el.addClass('missing');
  },
  hide: function() {
    this.$el.removeClass('faceup');
  }
});

var GridView = Backbone.View.extend({
    // personal props:
    // collection
    // shared props:
	el:'#memorygrid',
	initialize: function() {
        this.collection.restart();
        this.slots = []; // grid's subviews
        var len = this.collection.length;
		var cols = Math.ceil(Math.sqrt(len));
		for (var id=0; id<len; ++id) {
            var opts = {id:'id'+id, model:this.collection.at(id)};
            if (!(id%cols)) {
                opts.className = 'firstCol';
            }
            this.slots.push(new SlotView(opts)); //make one subview
		}
	},
  reset: function() {
    this.$el.html('');
    this.initialize();
    //this.slots.forEach(function(slot) {slot.render();});
  },
/*
  show: function(where,what) {
    console.log(this);
    this.slots[where].show(what);
  },
  hideSoon: function(where) {
    var slot = this.slots[where];
    window.setTimeout(function() { slot.hide();}, 1000);
  }
  */
});

var MainView = Backbone.View.extend({
  el:'#memorygame',
  events: {
        'click #resetBtn': 'reset'
  },
  initialize: function() {
    this.board = new GridView({collection:slots});
    this.resetBtn = $('<button id="resetBtn">Reset</button>').addClass('resetBtn').prependTo('#memorygame');
  },
  reset: function(evt) {
    evt.preventDefault();
    this.board.reset();
  }
});

return function(collection) { //Ctor
    this.mainview = new MainView({collection:collection});
} //end Ctor

})(); /// end IIFE

var gui = null;
$(function() {
	gui = new MemoryGUI(slots);
});
