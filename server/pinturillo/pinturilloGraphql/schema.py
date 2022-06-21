import graphene
from graphene_django import DjangoObjectType
from .models import Player, Room, Game,Drawing
import graphql_jwt
from graphql_jwt.decorators import login_required

## Types
class PlayerType(DjangoObjectType):
    class Meta:
        model = Player
        fields = ('id','username','email','first_name','last_name')

class RoomType(DjangoObjectType):
    class Meta:
        model = Room
        fields = ('id','title','name','players_online')

class GameType(DjangoObjectType): 
    class Meta:
        model = Game
        fields = ('id','winner','points','room')

class DrawingType(DjangoObjectType):
    class Meta:
        model = Drawing
    

class Query(graphene.ObjectType):
    players = graphene.List(PlayerType)
    player = graphene.Field(PlayerType,username=graphene.String())

    drawings = graphene.List(DrawingType)
    drawingsUser = graphene.List(DrawingType)
    rooms = graphene.List(RoomType)
    game = graphene.List(GameType)

    @login_required
    def resolve_drawings(root,info,**kwargs):
        return Drawing.objects.all()

    @login_required
    def resolve_drawingsUser(root,info,**kwargs):
        userId = info.context.user.id
        ownerInstance = Player.objects.get(id=userId)
        return Drawing.objects.filter(owner=ownerInstance)

    @login_required
    def resolve_players(root,info,**kwargs):
        return Player.objects.all()

    @login_required
    def resolve_player(root,info,**kwargs):
        username = kwargs.get('username')
        if username is not None:
            return Player.objects.get(username=username)
        return None

    @login_required
    def resolve_rooms(root,info,**kwargs):
        return Room.objects.all()
    
    @login_required
    def resolve_games(root,info,**kwargs):
        return Game.objects.all()

class CreateRoom(graphene.Mutation):
    room = graphene.Field(RoomType)

    class Arguments:
        title = graphene.String()
        name = graphene.String()
        players_online = graphene.Int()

    
    def mutate(root,info,title,name,players_online):
        room = Room.objects.create(title=title,name=name,players_online=players_online)
        return CreateRoom(room=room)

class CreatePlayer(graphene.Mutation):
    player = graphene.Field(PlayerType)

    class Arguments: 
        firstName = graphene.String()
        lastName = graphene.String()
        username = graphene.String()
        password = graphene.String()
        email = graphene.String()

    
    def mutate(self, info, username,password,email,firstName,lastName):
        player = Player()
        player.first_name = firstName
        player.last_name = lastName
        player.username = username
        player.email = email
        player.set_password(password)
        player.save()
        return CreatePlayer(player=player)

class CreateDrawing(graphene.Mutation):
    drawing = graphene.Field(DrawingType)

    class Arguments:
        name = graphene.String()
        data = graphene.String()

    def mutate(root,info,name,data):
        userId = info.context.user.id
        ownerInstance = Player.objects.get(id=userId)
        drawing = Drawing.objects.create(name=name,owner=ownerInstance,data=data)
        return CreateDrawing(drawing=drawing)

class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()

    create_room = CreateRoom.Field()
    create_player = CreatePlayer.Field()
    create_drawing = CreateDrawing.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)  
