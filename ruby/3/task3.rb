class BannerSet
  def initialize(numbers)
    @numbers = numbers.uniq
    @size = numbers.size
    @unused_numbers = @numbers.dup
  end

  def random_number
    number = @unused_numbers.sample
    @unused_numbers.delete(number)
    @unused_numbers = @numbers.dup if @unused_numbers.empty?
    number
  end
end

numbers = 5.times.map { rand 1..100 }
banner_set = BannerSet.new(numbers)
p numbers 
10.times { p banner_set.random_number }