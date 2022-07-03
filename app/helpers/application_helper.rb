module ApplicationHelper
  def image(src = 'placeholder.jpeg', options: {})
    image_tag src, options
  end

  def icon_tag(class_name, role: nil, data: {})
    content_tag :i, nil, { class: 'icon fa-solid '.concat(class_name), role: role }.merge(data)
  end
end
