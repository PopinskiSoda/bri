# ARGV.each do |a|
#   puts a
# end

SYMBOLS = { ooo: '   ', ool: '  |', o_o: ' _ ', o_l: ' _l', loo: '|  ',
            lol: '| |', l_o: '|_ ', l_l: '|_|' }.freeze

LCD_DIGITS = [
  %i[o_o lol l_l], %i[ooo ool ool], %i[o_o o_l l_o], %i[o_o o_l o_l],
  %i[ooo l_l ool], %i[o_o l_o o_l], %i[o_o l_o l_l], %i[o_o ool ool],
  %i[o_o l_l l_l], %i[o_o l_l o_l]
].freeze

def puts_lcd(number)
  digits = number.to_s.chars.map(&:to_i)
  p digits
  lcd_number = digits.map { |digit| LCD_DIGITS[digit] }
  p lcd_number
  lcd_lines = lcd_number.transpose.each { |line| line.map { |s| SYMBOLS[s] }}
  p lcd_lines
end

puts_lcd(12_345)
