var Slot = Backbone.Model.extend({});

var Slots = Backbone.Collection.extend({
  model: Slot,
  comparator: 'cid' // or perhaps sort by 'title'
});

var slots = new Slots();

slots.add([{face:'Cat',group:1},{face:'Kitten',group:1},
			{face:'Dog',group:2},{face:'Puppy',group:2},
      {face:'Bird',group:3},{face:'Chick',group:3},
      {face:'Frog',group:4},{face:'Tadpole',group:4}]);

/*
slots.models.forEach(function (item, index){
  console.log('item\'s cid :' + item.cid);
  console.log(item);
  console.log(item.toJSON());
});
*/

var SlotView = Backbone.View.extend({
  events: {
    'click': 'tryLift'
  },
  tryLift: function() {
      console.log("clicked "+this.id);
      //game.lift(id);
    },
  /*initialize2: function() {
  		$('<div>').attr('id',this.id).appendTo('#memorygame');
      this.el = '#'+this.id;
      this.$el = $(this.el);
      console.log(this.el);
  		this.render();
  },*/
  initialize: function() {
      this.$el.addClass('memoryCell');
      this.$el.appendTo('#memorygame');
      //console.log(this.el);
      this.render();
  },
  render: function() {
    this.$el.removeClass('faceup').removeClass('missing');
  },
  show: function(what) {
      this.$el.attr('value',what);
  		this.$el.addClass('faceup');
	},
  hide: function() {
    this.$el.removeClass('faceup');
  }
});

var MainView = Backbone.View.extend({
  events: {
        'click #reset': 'reset'
  },
  initialize: function() {
    this.resetBtn = $('<button id="reset">Reset</button').addClass('resetBtn').appendTo('body');
    this.board = new GridView({collection:slots});
  },
  reset: function() {
    this.board.reset();
  }
});

var GridView = Backbone.View.extend({
	el:'#memorygame',
	slots:[],
	initialize: function() {
    var len = this.collection.length;
		var cols = Math.ceil(Math.sqrt(len));
		//var grid = $el[0];
		for (var id=0; id<len; ++id) {
		//	this.slots.push(new SlotView({id:'id'+id}));
      var opts = {tagName:'div', id:'id'+id, model:this.collection[id]};
      if (!(id%cols)) {
          opts.className = 'firstCol';
      }
      //console.log(opts);
      this.slots.push(new SlotView(opts));
			//$el.append(makeCell(id,cols,clickFn));
		}
	},
  reset: function() {
    this.slots.forEach(function(slot) {slot.render();});
  },
  show: function(where,what) {
    this.slots[where].show(what);
  },
  hideSoon: function(where) {
    var slot = this.slots[where];
    window.setTimeout(function() { slot.hide();}, 1000);
  }
});

var mainview = null;
$(function() {
	mainview = new MainView({collection:slots});
});