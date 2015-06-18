
# we need to talk to a backend server. this is a gem module so that i dont'
# have to write it myself. 
require 'rest_client'

#A clas agains
class QuestionAndAnswer
	def initialize
		@base_address = 'https://mysterious-beyond-8314.herokuapp.com'
		@question = ''
		@answer = ''
		@name
	end

	def check_is_up
		response = false
		begin 
			RestClient.get @base_address
			response = true
		rescue StandardError => bang
			response = false
		end
		response
	end

	# Get the question from the server
	def get_question()
		# build the url
		url = @base_address + '/question'
		# make the request, the response will be the return value of the method
		@question = RestClient.get url
	end

	# ask the user for an answer
	def get_answer()
		puts 'Type your anser and press enter.'
		@answer = gets
	end

	def get_name()
		puts 'Please enter your name'
		@name = gets
		@name = @name.chomp
	end

	def ask_question
		puts
		puts
		puts @name + ", " + @question
	end

	# send the result back to server - i wrote the server to send me an email. 
	def send_answer()
		url = @base_address + "/answer"
		RestClient.post url, { 'answer' => @answer, 'question' => @question }.to_json, :content_type => :json, :accept => :json
	end
end


if __FILE__ == $0
  qa = QuestionAndAnswer.new
  is_up = qa.check_is_up
  if !is_up
  	abort('Waiting for server to spin up')
  end
  qa.get_name
  qa.get_question
  qa.ask_question
  qa.get_answer
  puts 'Sending your answer :)'
  qa.send_answer
end