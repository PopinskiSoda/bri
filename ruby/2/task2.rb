center = [0, 0]
radius = 50.0
circle = [center, radius]
points = 10.times.map { 2.times.map { rand -100.0..100.0 } }

def inside_circle?(point, circle)
  x, y = point
  center, radius = circle
  center_x, center_y = center
  (x - center_x)**2 + (y - center_y)**2 < radius**2
end

puts points.select { |point| inside_circle?(point, circle) }