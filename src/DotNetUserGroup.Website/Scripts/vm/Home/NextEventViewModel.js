(function() {

  window.NextEventViewModel = (function() {

    function NextEventViewModel() {
      var _this = this;
      this.title = ko.observable();
      this.date = ko.observable();
      this.url = ko.observable();
      this.description = ko.observable();
      this.eventPending = ko.observable(true);
      this.loading = ko.observable(true);
      $.getJSON('../api/events', function(data) {
        var e, event, events;
        _this.loading(false);
        events = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            e = data[_i];
            if (this.hasNotHappened(e)) {
              _results.push(e);
            }
          }
          return _results;
        }).call(_this);
        if (events.length) {
          event = events[0];
          _this.eventPending(false);
          _this.date(_this.formatDate(event));
          _this.url("http://www.eventbrite.ca/event/" + event.Id);
          _this.description(event.Description.split('\n').slice(0, 2).join('\n') + "...");
          return _this.title(event.Title);
        }
      });
    }

    NextEventViewModel.prototype.hasNotHappened = function(e) {
      return Date.parse(e.Date).compareTo(Date.today()) > 0;
    };

    NextEventViewModel.prototype.formatDate = function(e) {
      return Date.parse(e.Date).toString('MMM dd');
    };

    return NextEventViewModel;

  })();

}).call(this);
