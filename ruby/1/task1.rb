lines = File.readlines('input.txt')
kek = lines.map { |line| eval(line) }.concat.flatten.compact
           .each_with_object(Hash.new(0)) { |key, hash| hash[key] += 1 }
p kek
