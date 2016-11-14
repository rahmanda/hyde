# _plugins/render_note.rb
module Jekyll
  class RenderNoteTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      %|<span class='quote'><i class='i-quote u-text--op-3'></i>&nbsp;&nbsp;#{@text}</span>|
    end
  end
end

Liquid::Template.register_tag('note', Jekyll::RenderNoteTag)
